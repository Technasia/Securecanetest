using SC.UserManagment.Application.Commands.CreateUser;
using SC.UserManagment.Application.Commands.DeleteUser;
using SC.UserManagment.Application.Commands.UpdateUser;
using SC.UserManagment.Application.Models.CQRS.User;
using SC.UserManagment.Application.Queries.GetUser;
using SC.UserManagment.Application.Queries.GetUsers;
using SC.UserManagment.AzureTable.Repositories;
using SC.UserManagment.AzureTable.Services;
using SC.UserManagment.Tests.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC.UserManagment.Tests
{
  public class UserTableServiceMockTest
  {
    private readonly UserService _userService;
    private readonly UserRepository _userRepository;
    private readonly UserTableMock _userTable;

    public UserTableServiceMockTest()
    {
      _userTable = new UserTableMock();
      _userRepository = new UserRepository(_userTable);
      _userService = new UserService(_userRepository);
    }

    #region GetUserQuery

    [Fact]
    public async Task GetUserQueryTest()
    {
      GetUserQueryHandler handler = new GetUserQueryHandler(_userService);
      var result = await handler.RetrieveAsync(new GetUserQuery { 
        GroupId = Guid.Parse("dcffab4c-366e-469b-9c91-19539b7ed853"), 
        UserId = Guid.Parse("9a6ce101-71e1-4592-a23e-8f162aa15338")
      });

      Assert.Equal("Bobby", result?.FirstName);
      Assert.Equal("Lapointe", result?.LastName);
      Assert.Equal("bobby@test.fr", result?.Email);
      Assert.Equal("0111111111", result?.Phone);
      Assert.Equal("beaubbhy", result?.Login);
      //Assert.Equal(0, result.Status);
    }

    [Fact]
    public async Task ErrorGetUserQueryTest()
    {
      GetUserQueryHandler handler = new GetUserQueryHandler(_userService);
      var result = await handler.RetrieveAsync(new GetUserQuery
      {
        GroupId = Guid.Parse("dcffa04c-366e-469b-9c01-19039b7ed853"),
        UserId = Guid.Parse("9a60e101-7101-4590-a23e-8f162aa15338")
      });

      Assert.Null(result);
    }
    #endregion GetUserQuery

    #region GetUsersQuery

    [Fact]
    public async Task GetUsersQueryTest()
    {
      GetUsersQueryHandler handler = new GetUsersQueryHandler(_userService);
      var result = await handler.RetrieveAsync(new GetUsersQuery
      {
        GroupId = Guid.Parse("dcffab4c-366e-469b-9c91-19539b7ed853")
      });
      foreach(var res in result.Users)
      {
        Assert.NotNull(res?.FirstName);
        Assert.NotNull(res?.LastName);
        Assert.NotNull(res?.Email);
        Assert.NotNull(res?.Phone);
        Assert.NotNull(res?.Login);
      }

      //Assert.Equal(0, result.Status);
    }

    [Fact]
    public async Task ErrorGetUsersQueryTest()
    {
      GetUsersQueryHandler handler = new GetUsersQueryHandler(_userService);
      var result = await handler.RetrieveAsync(new GetUsersQuery
      {
        GroupId = Guid.Parse("dcffa04c-366e-469b-9c01-19039b7ed853")
      });
      Assert.Empty(result.Users);
    }
    #endregion GetUsersQuery


    #region CreateUserCommand

    [Fact]
    public async Task CreateUserCommandTest()
    {
      CreateUserCommandHandler handler = new CreateUserCommandHandler(_userService);
      var result = await handler.HandleAsync(new CreateUserCommand
      {
        User = new User
        {
          LastName = "test1",
          FirstName= "test1",
          Email = "test1",
          Phone= "test1",
          Login = "test1",
          Password = "test1",
        }
      });

      Assert.NotNull(result.Id?.UserId);
      Assert.NotNull(result.Id?.GroupId);

      //Assert.Equal(0, result.Status);
    }

    /*    [Fact]
        public async Task ErrorCreateUserCommandTest()
        {
          CreateUserCommandHandler handler = new CreateUserCommandHandler(_userService);
          var result = await handler.HandleAsync(new CreateUserCommand
          {
            User = new User()
          });

          Assert.Null(result.Id);

        }*/
    #endregion CreateUserCommand


    #region UpdateUserCommand

    [Fact]
    public async Task UpdateUserCommandTest()
    {
      UpdateUserCommandHandler handler = new UpdateUserCommandHandler(_userService);
      var result = await handler.HandleAsync(new UpdateUserCommand
      {
        User = new User
        {
          GroupId = Guid.Parse("5196dc38-07c2-463c-8bbc-9954fe33a606"),
          UserId = Guid.Parse("5c7744f8-cd3e-4157-880d-85f0e5689057"),
          LastName = "test3",
          FirstName = "test3",
          Email = "test3",
          Phone = "test3",
          Login = "test3",
          Password = "test3",
        }
      });

      Assert.NotNull(result.Id?.UserId);
      Assert.NotNull(result.Id?.GroupId);


      //Assert.Equal(0, result.Status);
    }

    /*    [Fact]
        public async Task ErrorCreateUserCommandTest()
        {
          CreateUserCommandHandler handler = new CreateUserCommandHandler(_userService);
          var result = await handler.HandleAsync(new CreateUserCommand
          {
            User = new User()
          });

          Assert.Null(result.Id);

        }*/
    #endregion UpdateUserCommand


    #region DeleteUserCommand

    [Fact]
    public async Task DeleteUserCommandTest()
    {
      DeleteUserCommandHandler handler = new DeleteUserCommandHandler(_userService);
      await handler.HandleAsync(new DeleteUserCommand
      {
          GroupId = Guid.Parse("5196dc38-07c2-463c-8bbc-9954fe33a606"),
          UserId = Guid.Parse("5c7744f8-cd3e-4157-880d-85f0e5689057")
      });

      GetUserQueryHandler handlerb = new GetUserQueryHandler(_userService);
      var result = await handlerb.RetrieveAsync(new GetUserQuery
      {
        GroupId = Guid.Parse("5196dc38-07c2-463c-8bbc-9954fe33a606"),
        UserId = Guid.Parse("5c7744f8-cd3e-4157-880d-85f0e5689057")
      });

      Assert.Null(result);


      //Assert.Equal(0, result.Status);
    }

    /*    [Fact]
        public async Task ErrorCreateUserCommandTest()
        {
          CreateUserCommandHandler handler = new CreateUserCommandHandler(_userService);
          var result = await handler.HandleAsync(new CreateUserCommand
          {
            User = new User()
          });

          Assert.Null(result.Id);

        }*/
    #endregion DeleteUserCommand


  }
}
