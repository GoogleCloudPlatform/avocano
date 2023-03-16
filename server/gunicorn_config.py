
# This hook is needed to avoid deadlocks in the opentelemetry batch span processor.
def post_fork(server,worker):
    from opentelemetry.instrumentation.auto_instrumentation import sitecustomize