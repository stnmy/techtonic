using System.Text.Json.Serialization;

namespace API.Models.OrderModels
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PaymentMethod
    {
        Card,
        CashOnDelivery,
        Bkash,
        Nagad,
        Rocket
    }
}