using System.Text.Json.Serialization;

namespace API.Models.OrderModels
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PaymentStatus
    {
        Pending,
        Completed,
        Refunded
    }
}