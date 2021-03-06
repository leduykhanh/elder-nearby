import traceback
from django.http import JsonResponse
def is_registered(exception):
    try:
        return exception.is_an_error_response
    except AttributeError:
        return False
class RequestExceptionHandler:

    def process_exception(self, request, exception):
        if is_registered(exception):
            status = exception.status_code
            exception_dict = exception.to_dict()
        else:
            status = 500
            exception_dict = {'errorMessage': 'Unexpected Error!'}

        error_message = exception_dict['errorMessage']
        traceback.print_exc()
        return JsonResponse(exception_dict, status=status)
