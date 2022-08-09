﻿using SC.UserManagment.Application.Models.CQRS.User;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SC.UserManagment.Application.Repositories
{
  /// <summary>
  /// 
  /// </summary>
  public interface IUserRepository
  {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    Task<User> CreateUserAsync(User user);

    /// <summary>
    /// 
    /// </summary>
    /// <param name="groupId"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<bool> IsExistAsync(string groupId, string userId);
    
    /// <summary>
    /// 
    /// </summary>
    /// <param name="login"></param>
    /// <returns></returns>
    Task<bool> IsExistByLoginAsync(string login);

    /// <summary>
    /// 
    /// </summary>
    /// <param name="groupId"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<User?> GetUserAsync(string groupId, string userId);

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    Task<List<User>> GetUsersAsync(string groupId);

    /// <summary>
    /// 
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    Task<User> UpdateUserAsync(User user);

    /// <summary>
    /// 
    /// </summary>
    /// <param name="groupId"></param>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task DeleteUserAsync(string groupId, string userId);
  }
}
