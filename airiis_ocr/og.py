import json
from helper import FileHelper
from ta import TextAnalyzer, TextMedicalAnalyzer, TextTranslater
from trp import *

class OutputGenerator:
    def __init__(self, response, fileName, forms, tables):
        self.response = response
        self.fileName = fileName
        self.forms = forms
        self.tables = tables

        self.document = Document(self.response)

    def run(self):

        if(not self.document.pages):
            return

        FileHelper.writeToFile("{}-response.json".format(self.fileName), json.dumps(self.response))

        print("Total Pages in Document: {}".format(len(self.document.pages)))

        p = 1

        # AQUI ES PARA GUARDAR UN ARCHIVO POR PAGINA. NO ES NECESARIO PARA ESTA ETAPA PORQUE SE INCLUYE EN EL PASO ANTERIOR
        """
        for page in self.document.pages:

            FileHelper.writeToFile("{}-page-{}-response.json".format(self.fileName, p), json.dumps(page.blocks))

            p = p + 1
        """