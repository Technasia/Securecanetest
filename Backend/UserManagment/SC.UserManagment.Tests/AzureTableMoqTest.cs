using Moq;
using SC.UserManagment.AzureTable.Entities;
using SC.UserManagment.AzureTable.Repositories;
using SC.UserManagment.AzureTable.Services;
using SC.UserManagment.AzureTable.Tables;
using SC.UserManagment.Tests.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC.UserManagment.Tests
{
  public class AzureTableMoqTest
  {
    private readonly UserService _userService;
    private readonly UserRepository _userRepository;
    private readonly Mock<IUserTable> _userTable;

    public AzureTableMoqTest()
    {
      _userTable = new Mock<IUserTable>();
      _userRepository = new UserRepository(_userTable.Object);
      _userService = new UserService(_userRepository);
    }

/*    [Fact]
    public async Task SimpleMoqExceptionTest()
    {
      _userTable.Setup(s => s.UpsertEntityAsync(It.IsAny<UserEntity>())).Returns(async (UserEntity userEntity) =>
      {
        throw new Exception();
      });
      HelloWorldByPartnerQueryHandler handler = new HelloWorldByPartnerQueryHandler(_partnerHelloWorldService);
      var result = await handler.RetrieveAsync(new HelloWorldByPartnerQuery());

      Assert.Equal("Bonjour à tous", result.Description);
      Assert.Equal("Royaume-Uni", result.From);
      Assert.False(result.IsFrance);
    }*/

  }
}
