using SC.UserManagment.AzureTable.Entities;
using SC.UserManagment.AzureTable.Tables;

namespace SC.UserManagment.Tests.Tables
{
  public class UserTableMock : IUserTable
  {
    private readonly List<UserEntity> list;

    public UserTableMock()
    {
      list = new List<UserEntity>();
      list.Add(new UserEntity
      {
        RowKey = "9a6ce101-71e1-4592-a23e-8f162aa15338",
        PartitionKey = "dcffab4c-366e-469b-9c91-19539b7ed853",
        Login = "beaubbhy",
        FirstName = "Bobby",
        LastName = "Lapointe",
        Email = "bobby@test.fr",
        Phone = "0111111111",
        Timestamp = DateTime.Now,
        CreatedAt = DateTime.Now
      });
      list.Add(new UserEntity
      {
        RowKey = "bb26d076-1c76-49b0-b3b8-4ee79e3f29c2",
        PartitionKey = "8e5e30bd-8b1e-40f5-b7ff-d2e0d26b007b",
        Login = "azert",
        FirstName = "azertyuiop",
        LastName = "qsdfghjklm",
        Email = "azert@test.fr",
        Phone = "02222222222",
        Timestamp = DateTime.Now,
        CreatedAt = DateTime.Now
      });
      list.Add(new UserEntity
      {
        RowKey = "5c7744f8-cd3e-4157-880d-85f0e5689057",
        PartitionKey = "5196dc38-07c2-463c-8bbc-9954fe33a606",
        Login = "aze",
        FirstName = "azerty",
        LastName = "uiop",
        Email = " azert@test.fr",
        Phone = "033333333333",
        Timestamp = DateTime.Now,
        CreatedAt = DateTime.Now
      });
    }

    public async Task DeleteEntityAsync(string groupId, string userId)
    {
      var e = await GetEntityAsync(groupId, userId);
      if (e != null)
      {
        list.Remove(e);
        //return true;
      }
      //retrun false;
      await Task.CompletedTask;
    }

    public Task<IEnumerable<UserEntity>> GetEntitiesAsync(string groupId)
    {
      return Task.FromResult(list.Where(e => e.PartitionKey == groupId).AsEnumerable());
    }

    public Task<IEnumerable<UserEntity>> GetEntitiesByLoginAsync(string login)
    {
      return Task.FromResult(list.Where(e => e.Login == login).AsEnumerable());
    }

    public Task<UserEntity?> GetEntityAsync(string groupId, string userId)
    {
      return Task.FromResult(list.Where(e => e.PartitionKey == groupId && e.RowKey == userId).FirstOrDefault());
    }

    public Task<UserEntity> UpsertEntityAsync(UserEntity entity)
    {
      var e = list.Where(e => e.PartitionKey == entity.PartitionKey && e.RowKey == entity.RowKey).FirstOrDefault();
      if (e != null)
      {
        var i = list.IndexOf(e);
        list.Remove(e);
        list.Insert(i, entity);
      }
      else
      {
        list.Add(entity);
      }
      return Task.FromResult(entity);
    }
  }
}