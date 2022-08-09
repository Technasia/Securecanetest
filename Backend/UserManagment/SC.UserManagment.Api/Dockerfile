#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Backend/UserManagment/SC.UserManagment.Api/SC.UserManagment.Api.csproj", "Backend/UserManagment/SC.UserManagment.Api/"]
COPY ["Backend/Common/net6/SC.Common.CQRS/SC.Common.CQRS.csproj", "Backend/Common/net6/SC.Common.CQRS/"]
COPY ["Backend/UserManagment/SC.UserManagment.Application/SC.UserManagment.Application.csproj", "Backend/UserManagment/SC.UserManagment.Application/"]
COPY ["Backend/UserManagment/SC.UserManagment.AzureTable/SC.UserManagment.AzureTable.csproj", "Backend/UserManagment/SC.UserManagment.AzureTable/"]
COPY ["Backend/Common/net6/SC.Common.AzureTables/SC.Common.AzureTables.csproj", "Backend/Common/net6/SC.Common.AzureTables/"]
RUN dotnet restore "Backend/UserManagment/SC.UserManagment.Api/SC.UserManagment.Api.csproj"
COPY . .
WORKDIR "/src/Backend/UserManagment/SC.UserManagment.Api"
RUN dotnet build "SC.UserManagment.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SC.UserManagment.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SC.UserManagment.Api.dll"]