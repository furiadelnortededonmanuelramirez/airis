import sys
import os
from urllib.parse import urlparse
import boto3
import time
from tdp import DocumentProcessor
from og import OutputGenerator
from helper import FileHelper, S3Helper

class Textractor:
    def getInputParameters(self, args):
        event = {}
        i = 0
        event['documents'] = 's3://airisdocs/Doc1.pdf'
        event['tables'] = True

        return event

    def validateInput(self, args):

        event = self.getInputParameters(args)

        ips = {}

        if(not 'documents' in event):
            raise Exception("Document or path to a foler or S3 bucket containing documents is required.")

        inputDocument = event['documents']
        idl = inputDocument.lower()

        bucketName = None
        documents = []
        awsRegion = 'us-east-1'

        if(idl.startswith("s3://")):
            o = urlparse(inputDocument)
            bucketName = o.netloc
            path = o.path[1:]
            ar = S3Helper.getS3BucketRegion(bucketName)
            if(ar):
                awsRegion = ar

            if(idl.endswith("/")):
                allowedFileTypes = ["jpg", "jpeg", "png", "pdf"]
                documents = S3Helper.getFileNames(awsRegion, bucketName, path, 1, allowedFileTypes)
            else:
                documents.append(path)
        else:
            if(idl.endswith("/")):
                allowedFileTypes = ["jpg", "jpeg", "png"]
                documents = FileHelper.getFileNames(inputDocument, allowedFileTypes)
            else:
                documents.append(inputDocument)

            if('region' in event):
                awsRegion = event['region']

        ips["bucketName"] = bucketName
        ips["documents"] = documents
        ips["awsRegion"] = awsRegion
        ips["text"] = ('text' in event)
        ips["forms"] = ('forms' in event)
        ips["tables"] = ('tables' in event)
        ips["insights"] = ('insights' in event)
        ips["medical-insights"] = ('medical-insights' in event)
        if("translate" in event):
            ips["translate"] = event["translate"]
        else:
            ips["translate"] = ""

        return ips

    def processDocument(self, ips, i, document):
        print("\nTextracting Document # {}: {}".format(i, document))
        print('=' * (len(document)+30))

        # Get document textracted
        dp = DocumentProcessor(ips["bucketName"], document, ips["awsRegion"], ips["text"], ips["forms"], ips["tables"])
        response = dp.run()

        if(response):
            print("Recieved Textract response...")
            #FileHelper.writeToFile("temp-response.json", json.dumps(response))

            #Generate output files
            print("Generating output...")
            name, ext = FileHelper.getFileNameAndExtension(document)
            opg = OutputGenerator(response,
                        "{}-{}".format(name, ext),
                        ips["forms"], ips["tables"])
            opg.run()

            if(ips["insights"] or ips["medical-insights"] or ips["translate"]):
                opg.generateInsights(ips["insights"], ips["medical-insights"], ips["translate"], ips["awsRegion"])

            print("{} textracted successfully.".format(document))
        else:
            print("Could not generate output for {}.".format(document))

    def printFormatException(self, e):
        print("Invalid input: {}".format(e))

    def run(self):

        ips = None
        try:
            ips = self.validateInput(sys.argv)
        except Exception as e:
            self.printFormatException(e)

        #try:
        i = 1
        totalDocuments = len(ips["documents"])

        print("\n")
        print('*' * 60)
        print("Total input documents: {}".format(totalDocuments))
        print('*' * 60)

        for document in ips["documents"]:
            self.processDocument(ips, i, document)

            remaining = len(ips["documents"])-i

            if(remaining > 0):
                print("\nRemaining documents: {}".format(remaining))

                # print("\nTaking a short break...")
                # time.sleep(20)
                # print("Allright, ready to go...\n")

            i = i + 1

        print("\n")
        print('*' * 60)
        print("Successfully textracted documents: {}".format(totalDocuments))
        print('*' * 60)
        print("\n")
        #except Exception as e:
        #    print("Something went wrong:\n====================================================\n{}".format(e))

Textractor().run()
