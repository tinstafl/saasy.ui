package ui.saasy;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import ui.saasy.model.CognitoMessageEvent;
import ui.saasy.response.ForgotPasswordResponse;
import ui.saasy.response.ResendCodeResponse;
import ui.saasy.response.SignUpResponse;
import ui.saasy.response.UpdateUserAttributeResponse;
import ui.saasy.response.VerifyUserAttributeResponse;

public class Handler implements RequestHandler<CognitoMessageEvent, CognitoMessageEvent> {
  public CognitoMessageEvent handleRequest(CognitoMessageEvent event, Context context) {
    if (event.triggerSource().equals(TriggerSource.CustomMessage_SignUp.name())) {
      context.getLogger().log("custom message signup");
      return new SignUpResponse(event).get();
    }

    if (event.triggerSource().equals(TriggerSource.CustomMessage_ResendCode.name())) {
      context.getLogger().log("custom message resend code");
      return new ResendCodeResponse(event).get();
    }

    if (event.triggerSource().equals(TriggerSource.CustomMessage_ForgotPassword.name())) {
      context.getLogger().log("custom message forgot password");
      return new ForgotPasswordResponse(event).get();
    }

    if (event.triggerSource().equals(TriggerSource.CustomMessage_UpdateUserAttribute.name())) {
      context.getLogger().log("custom message update attribute");
      return new UpdateUserAttributeResponse(event).get();
    }

    if (event.triggerSource().equals(TriggerSource.CustomMessage_VerifyUserAttribute.name())) {
      context.getLogger().log("custom message verify attribute");
      return new VerifyUserAttributeResponse(event).get();
    }

    return event;
  }
}
