﻿using System;
using System.Text.Json.Serialization;

namespace SC.UserManagment.Application.Models.V1.User
{
  /// <summary>
  /// 
  /// </summary>
  public class UpdateUserResultModel
  {

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("groupId")]
    public Guid GroupId { get; set; }
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("userId")]
    public Guid UserId { get; set; }
  }
}