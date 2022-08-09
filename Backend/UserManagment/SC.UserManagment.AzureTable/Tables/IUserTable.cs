using SC.UserManagment.AzureTable.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SC.UserManagment.AzureTable.Tables
{
  public interface IUserTable
  {
    Task<IEnumerable<UserEntity>> GetEntitiesAsync(string groupId);
    Task<IEnumerable<UserEntity>> GetEntitiesByLoginAsync(string login);
    Task<UserEntity?> GetEntityAsync(string groupId, string userId);
    Task<UserEntity> UpsertEntityAsync(UserEntity entity);
    Task DeleteEntityAsync(string groupId, string userId);
  }
}
