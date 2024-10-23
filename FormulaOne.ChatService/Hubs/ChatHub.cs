using FormulaOne.ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace FormulaOne.ChatService.Hubs
{
    public class ChatHub : Hub
    { 
        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All
                .SendAsync(method: "RecieveMessage", arg1: "admin", arg2: $"{conn.Username} has joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName: conn.ChatRoom);
            await Clients.Group(conn.ChatRoom).SendAsync(method: "RecieveMessage", arg1:"admin", arg2:$"{conn.Username} has joined {conn.ChatRoom}");
        }
    }
}
