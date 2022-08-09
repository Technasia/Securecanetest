using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SC.UserManagment.Application.Exceptions
{
  public class UserManagmentException : Exception
  {
    public UserManagmentException()
    {
    }

    public UserManagmentException(string? message) : base(message)
    {
    }

    public UserManagmentException(string? message, Exception? innerException) : base(message, innerException)
    {
    }

    protected UserManagmentException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }
  }
}
