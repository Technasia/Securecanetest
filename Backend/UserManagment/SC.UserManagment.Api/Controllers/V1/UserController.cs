using Mapster;
using Microsoft.AspNetCore.Mvc;
using SC.Common.CQRS;
using SC.UserManagment.Application.Commands.CreateUser;
using SC.UserManagment.Application.Commands.DeleteUser;
using SC.UserManagment.Application.Commands.UpdateUser;
using SC.UserManagment.Application.Errors;
using SC.UserManagment.Application.Models.CQRS.User;
using SC.UserManagment.Application.Models.V1.User;
using SC.UserManagment.Application.Queries.GetUser;
using SC.UserManagment.Application.Queries.GetUsers;
using System.ComponentModel.DataAnnotations;

namespace SC.UserManagment.Api.Controllers.V1;

/// <summary>
/// 
/// </summary>
[ApiController]
[ApiVersion("1")]
[Route("api/v{version:apiVersion}/[controller]")]
public class UserController : ControllerBase
{
  /// <summary>
  /// 
  /// </summary>
  private readonly IDispatcher _dispatcher;

  /// <summary>
  /// 
  /// </summary>
  /// <param name="dispatcher"></param>
  public UserController(IDispatcher dispatcher)
  {
    _dispatcher = dispatcher;
  }

  /// <summary>
  /// Create user in AzureTable
  /// </summary>
  /// <returns></returns>
  [HttpPost]
  [Produces("application/json")]
  [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CreateUserResultModel))]
  [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponseResultModel))]
  public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
  {
    var command = new CreateUserCommand()
    {
      User = dto.Adapt<User>()
    };
    var res = await _dispatcher.SendAsync<CreateUserCommand, CreateUserResultModel>(command);
    return Created($"/api/v1/User/{res.GroupId}/{res.UserId}", res);
  }

  /// <summary>
  /// GET specific user
  /// </summary>
  /// <returns></returns>
  [HttpGet("{groupId}/{userId}")]
  [Produces("application/json")]
  [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetUserResultModel))]
  [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponseResultModel))]
  public async Task<IActionResult> GetUser([FromRoute, Required] Guid groupId, [FromRoute, Required] Guid userId)
  {
    var res = await _dispatcher.GetResultAsync<GetUserQuery, GetUserResultModel>(new GetUserQuery() { GroupId = groupId, UserId = userId });
    if (res == null)
      return NotFound("User not found");
    return Ok(res);
  }

  /// <summary>
  /// GET all users from group
  /// </summary>
  /// <returns></returns>
  [HttpGet("{groupId}")]
  [Produces("application/json")]
  [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetUsersResultModel))]
  [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponseResultModel))]
  public async Task<IActionResult> GetAllUsersFromGroup([FromRoute, Required] Guid groupId)
  {
    return Ok(await _dispatcher.GetResultAsync<GetUsersQuery, GetUsersResultModel>(new GetUsersQuery() { GroupId = groupId }));
  }

  /// <summary>
  /// Update user
  /// </summary>
  /// <returns></returns>
  [HttpPut("{groupId}/{userId}")]
  [Produces("application/json")]
  [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UpdateUserResultModel))]
  [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponseResultModel))]
  public async Task<IActionResult> UpdateUser([FromRoute, Required] Guid groupId, [FromRoute, Required] Guid userId, [FromBody, Required] UpdateUserDto dto)
  {
    var command = new UpdateUserCommand()
    {
      User = dto.Adapt<User>()
    };
    command.User.UserId = userId;
    command.User.GroupId = groupId;
    return Ok(await _dispatcher.SendAsync<UpdateUserCommand, UpdateUserResultModel>(command));
  }


  /// <summary>
  /// Delete user in AzureTable
  /// </summary>
  /// <returns></returns>
  [HttpDelete("{groupId}/{userId}")]
  [Produces("application/json")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponseResultModel))]
  public async Task<IActionResult> DeleteUser([FromRoute, Required] Guid groupId, [FromRoute, Required] Guid userId)
  {
    await _dispatcher.SendAsync<DeleteUserCommand>(new DeleteUserCommand() { GroupId = groupId, UserId = userId });
    return Ok();
  }

}
