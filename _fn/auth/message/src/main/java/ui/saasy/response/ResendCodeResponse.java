package ui.saasy.response;

import ui.saasy.model.CognitoEvent;
import ui.saasy.model.CognitoMessage;

public class ResendCodeResponse {
  private final CognitoEvent event;
  private final String smsMessage = "Please use verification code '{####}' to validate your phone number.";
  private final String emailSubject = "saasy verification (1)";
  private final String emailMessage;

  {
    emailMessage = """
      <body style="user-select: none; background-color: #f9f9f9; max-width: 64rem; margin-left: auto; margin-right: auto; font-family: 'Source Sans Pro',monospace;">
      <h1 style="color: #ffcce0;">saasy</h1>
      <div>
          <p>
              Hey %s,
          </p>
      </div>
      <div>
          <p>
              You can use verification code <code style="user-select: text; font-weight: 800; font-size: 1.5rem; line-height: 2rem;">{####}</code> to validate your email and get started.
          </p>
      </div>
      </body>
      """;
  }

  public ResendCodeResponse(CognitoEvent event) {
    var username = event.request().userAttributes().getOrDefault("preferred_username", event.request().userAttributes().get("email"));
    var formattedEmailMessage = String.format(emailMessage, username);
    var response = new CognitoMessage(smsMessage, formattedEmailMessage, emailSubject).map();
    this.event = CognitoEvent.from(event, response);
  }

  public CognitoEvent get() {
    return event;
  }
}