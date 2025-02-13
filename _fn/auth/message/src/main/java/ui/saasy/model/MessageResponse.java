package ui.saasy.model;

public record MessageResponse(
  String emailSubject,
  String emailMessage,
  String smsMessage
) {}
