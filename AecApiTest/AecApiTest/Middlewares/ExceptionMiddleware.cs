
using System.Net;
using System.Text.Json;

namespace AecApiTest.Middlewares
{
    public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger) 
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Erro não tratado: {Message}", ex.Message);

                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";

            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new
            {
                status = 500,
                message = "Ocorreu um erro interno. Tente novamente mais tarde."
            };

            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}