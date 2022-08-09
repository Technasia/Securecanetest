using SC.Common.CQRS.Commands;
using SC.Common.CQRS.Events;
using SC.UserManagment.Application.Models.V1.User;
using SC.UserManagment.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SC.UserManagment.Application.Commands.DeleteUser
{
  /// <summary>
  /// 
  /// </summary>
  public class DeleteUserCommandHandler : ICommandHandlerAsync<DeleteUserCommand>
  {
    private readonly IUserService _userService;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="userService"></param>
    public DeleteUserCommandHandler(IUserService userService)
    {
      _userService = userService;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    public async Task<IEnumerable<IEvent>> HandleAsync(DeleteUserCommand command)
    {
      await _userService.DeleteUserAsync(command.GroupId, command.UserId);

      return null;
    }
  }
}
