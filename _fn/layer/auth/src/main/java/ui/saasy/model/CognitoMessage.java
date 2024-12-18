package ui.saasy.model;

import java.util.Map;

public record CognitoMessage(
  String smsMessage,
  String emailMessage,
  String emailSubject
) {

  public Map<String, Object> map() {
    return Map.of(
      "smsMessage", smsMessage,
      "emailMessage", emailMessage,
      "emailSubject", emailSubject);
  }
}
