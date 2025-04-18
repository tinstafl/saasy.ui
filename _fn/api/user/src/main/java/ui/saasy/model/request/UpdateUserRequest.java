package ui.saasy.model.request;

import ui.saasy.model.Settings;

public record UpdateUserRequest(
  String phone,
  String username,
  Settings settings
) {}
