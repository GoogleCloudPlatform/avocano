
import logging
from django.http import HttpResponse, HttpResponseServerError

class HealthCheckMiddleware(object):
    """Django middleware to answer health checks.
    
    Responds to /healthy and /ready
    """
    def __init__(self, get_response) -> None:
        self.get_response = get_response

    def __call__(self, request):
        if request.method == "GET":
            if request.path == "/healthy":
                return self.healthy(request)
            if request.path == "/ready":
                return self.dbcheck(request)
        return self.get_response(request)

    def healthy(self, request):
        return HttpResponse("ok")
    
    def dbcheck(self, request) -> HttpResponse:
        try:
            import django.db as ddb
            dbconn = ddb.connections[ddb.DEFAULT_DB_ALIAS]
            c = dbconn.cursor()
            c.execute('SELECT 1;')
            row = c.fetchone()
            if row == None:
                raise Exception("db: invalid response")
        except Exception as e:
            logging.exception(e)
            return HttpResponseServerError("db: failed health check")
        return HttpResponse("ok")

