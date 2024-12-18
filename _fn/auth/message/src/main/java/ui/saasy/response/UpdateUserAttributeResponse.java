package ui.saasy.response;

import ui.saasy.model.CognitoEvent;
import ui.saasy.model.CognitoMessage;

public class UpdateUserAttributeResponse {
  private final CognitoEvent event;

  public UpdateUserAttributeResponse(CognitoEvent event) {
    var response = new CognitoMessage(
      "Please use verification code '{####}' to validate your phone number.",
      "Please use verification code '{####}' to validate your email.",
      "saasy verification").map();

    this.event = CognitoEvent.from(event, response);
  }

  public CognitoEvent get() {
    return event;
  }
}
