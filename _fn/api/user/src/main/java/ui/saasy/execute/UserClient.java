package ui.saasy.execute;

import ui.saasy.Env;
import ui.saasy.Logging;
import lombok.SneakyThrows;
import org.apache.logging.log4j.Logger;
import software.amazon.awssdk.services.dynamodb.DynamoDbAsyncClient;
import software.amazon.awssdk.services.dynamodb.model.*;
import ui.saasy.model.User;
import ui.saasy.model.request.UpdateUserRequest;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

public class UserClient {
  private final Logger log = Logging.handler();
  private final DynamoDbAsyncClient dynamoDbClient;

  public UserClient(DynamoDbAsyncClient dynamoDbClient) {
    this.dynamoDbClient = dynamoDbClient;
  }

  @SneakyThrows
  public CompletableFuture<User> update(String subscriberId, UpdateUserRequest request) {
    return dynamoDbClient.updateItem(
        UpdateItemRequest.builder()
          .tableName(System.getenv(Env.DYNAMODB_USER_TABLE.name()))
          .key(Map.of("id", AttributeValue.builder().s(subscriberId).build()))
          .updateExpression("SET phone = :phone, username = :username, settings = :settings, updated = :updated")
          .expressionAttributeValues(Map.of(
            ":phone", AttributeValue.builder().s(request.phone()).build(),
            ":username", AttributeValue.builder().s(request.username()).build(),
            ":settings", AttributeValue.builder().m(request.settings().attributeValue()).build(),
            ":updated", AttributeValue.builder().s(Instant.now().toString()).build()))
          .returnValues(ReturnValue.ALL_NEW)
          .build())
      .thenApply(response -> {
        log.debug("updated subscriber {}", response);
        var attributes = response.attributes();
        return User.from(attributes);
      })
      .exceptionally(e -> {
        log.error("error updating subscriber {} {} {}", subscriberId, request, e.getMessage());
        return null;
      });
  }

  @SneakyThrows
  public CompletableFuture<User> get(String subscriberId) {
    return dynamoDbClient.getItem(
        GetItemRequest.builder()
          .tableName(System.getenv(Env.DYNAMODB_USER_TABLE.name()))
          .key(Map.of("id", AttributeValue.builder().s(subscriberId).build()))
          .consistentRead(true)
          .build())
      .thenApply(response -> {
        log.debug("get subscriber {}", response);
        return User.from(response.item());
      })
      .exceptionally(e -> {
        log.error("error reading subscriber {} {}", subscriberId, e.getMessage());
        return null;
      });
  }

  @SneakyThrows
  public CompletableFuture<Boolean> delete(String subscriberId) {
    return dynamoDbClient.deleteItem(
        DeleteItemRequest.builder()
          .tableName(System.getenv(Env.DYNAMODB_USER_TABLE.name()))
          .key(Map.of("id", AttributeValue.builder().s(subscriberId).build()))
          .returnValues(ReturnValue.NONE)
          .build())
      .thenApply(response -> {
        log.debug("deleted subscriber {}", response);
        return true;
      })
      .exceptionally(e -> {
        log.error("error deleting subscriber {} {}", subscriberId, e.getMessage());
        return false;
      });
  }
}