using Azure.Data.Tables;
using Moq;
using SC.Common.AzureTables;

namespace SC.Common.AzureTables.Tests
{
  public class BaseTableTest
  {
    private readonly Mock<BaseTable<TableEntity>> _tableMoq;
    private readonly BaseTable<TableEntity> _tableBase;

    public BaseTableTest()
    {
      _tableMoq = new Mock<BaseTable<TableEntity>>("ConnectionString", "tablename");
      _tableBase = new BaseTable<TableEntity>("RealConnectionString", "tablename");
    }

    [Fact]
    public async Task TestExceptionsNoSetup()
    {
      var table = _tableMoq.Object;

      await Assert.ThrowsAsync<InvalidOperationException>(async () => { await table.GetTableClient(); });
    }

  }
}