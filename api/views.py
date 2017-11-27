from rest_framework.views import APIView
from rest_framework.response import Response
from pygments import highlight
import pygments
from pygments import lexers
from pygments.lexers import guess_lexer
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter
from bs4 import BeautifulSoup
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class SnippetAnalysis(APIView):
    '''
        This method helps in code analysis :
        Submitting Code text returns the language
        While simply making a get request returns the list of
        supported languages
    '''

    def post(self, request):
        code = request.data['code']
        language = guess_lexer(code).name
        return Response(language)

    def get(self, request):
        return Response(LANGUAGE_CHOICES)


class SnippetHighlight(APIView):
    """
    Returns the highlighted code

    Syntax highlight requires the submission of following params
    - code
    - language

    """

    def post(self, request):
        request_object = request.data
        lexer = get_lexer_by_name(
            str(request_object['language']), stripall=True)
        formatter = HtmlFormatter(linenos=True, cssclass="source")
        highlighted_code = highlight(request_object['code'], lexer, formatter)
        return Response(highlighted_code)


class SnippetComments(APIView):

    def post(self, request):
        pygment_comments = [
            pygments.token.Comment,
            pygments.token.Comment.Hashbang,
            pygments.token.Comment.Multiline,
            pygments.token.Comment.Preproc,
            pygments.token.Comment.Single,
            pygments.token.Comment.Special,
            pygments.token.Literal.String.Doc
        ]

        request_object = request.data
        lexer = get_lexer_by_name(
            str(request_object['language']), stripall=True)
        formatter = HtmlFormatter(linenos=True, cssclass="source")
        comments = ""
        for token_type, token_text in lexer.get_tokens(request_object['code']):
            if token_type in pygment_comments:
                comments = comments + token_text + '\n'

        result = highlight(comments, lexer, formatter)

        return Response(result)
