package ui.saasy;

import com.fasterxml.jackson.databind.ObjectMapper;
import software.amazon.awssdk.services.dynamodb.DynamoDbAsyncClient;

public class DependencyFactory {
  public static ObjectMapper objectMapper() {
    return SharedDependencyFactory.objectMapper();
  }

  public static DynamoDbAsyncClient dynamoDbClient() {
    return SharedDependencyFactory.dynamoDbAsyncClient();
  }
}
