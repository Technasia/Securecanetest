using Azure;
using Azure.Data.Tables;
using Microsoft.Extensions.Configuration;
using SC.Common.AzureTables;
using SC.UserManagment.AzureTable.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC.UserManagment.AzureTable.Tables
{
  public class UserTable : BaseTable<UserEntity>, IUserTable
  {
    public UserTable(string tableName, string storageConnectionString)
      : base(tableName, storageConnectionString) { }


    public async Task<IEnumerable<UserEntity>> GetEntitiesAsync(string groupId)
    {
      var tableClient = await GetTableClient();
      AsyncPageable<UserEntity> awaitableResult = tableClient.QueryAsync<UserEntity>(TableClient.CreateQueryFilter($"PartitionKey eq {groupId}"));
      List<UserEntity> result = new List<UserEntity>();
      await foreach (UserEntity user in awaitableResult)
      {
        result.Add(user);
      }
      return result.AsEnumerable();
    }

    public async Task<UserEntity?> GetEntityAsync(string groupId, string userId)
    {
      var tableClient = await GetTableClient();
      AsyncPageable<UserEntity> awaitableResult = tableClient.QueryAsync<UserEntity>(TableClient.CreateQueryFilter($"PartitionKey eq {groupId} && RowKey eq {userId}"));
      var t = awaitableResult.AsPages().GetAsyncEnumerator();

      var tes = t.Current;
      var test = tes.Values;
      return test?.First();
    }

    public async Task<UserEntity> UpsertEntityAsync(UserEntity entity)
    {
      await InsertOrUpdateEntityAsync(entity);
      return entity;
    }
    public async Task DeleteEntityAsync(string groupId, string userId)
    {
      var tableClient = await GetTableClient();
      var entity = await GetEntityAsync(groupId, userId);
      if (entity != null)
      {
        await tableClient.DeleteEntityAsync(groupId, userId);
        //return true;
      }
      //return false;
    }

    public async Task<IEnumerable<UserEntity>> GetEntitiesByLoginAsync(string login)
    {
      var tableClient = await GetTableClient();
      AsyncPageable<UserEntity> awaitableResult = tableClient.QueryAsync<UserEntity>(TableClient.CreateQueryFilter($"Login eq {login}"));
      List<UserEntity> result = new List<UserEntity>();
      await foreach (UserEntity user in awaitableResult)
      {
        result.Add(user);
      }
      return result.AsEnumerable();
    }
  }
}
