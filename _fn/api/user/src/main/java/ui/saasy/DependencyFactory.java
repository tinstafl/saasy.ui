package ui.saasy;

import com.fasterxml.jackson.databind.ObjectMapper;
import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.http.crt.AwsCrtAsyncHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderAsyncClient;
import software.amazon.awssdk.services.dynamodb.DynamoDbAsyncClient;

public class DependencyFactory {
  public static ObjectMapper objectMapper() {
    return SharedDependencyFactory.objectMapper();
  }

  public static DynamoDbAsyncClient dynamoDbClient() {
    return SharedDependencyFactory.dynamoDbAsyncClient();
  }

  public static CognitoIdentityProviderAsyncClient cognitoIdentityClient() {
    return CognitoIdentityProviderAsyncClient.builder()
      .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
      .region(Region.of(System.getenv("AWS_DEFAULT_REGION")))
      .httpClientBuilder(AwsCrtAsyncHttpClient.builder())
      .build();
  }
}
