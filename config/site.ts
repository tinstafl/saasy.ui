export const site = {
  name: "saasy.ui",
  description: "build cool stuff.",
  page: {
    _: {
      home: "/",
      product: {
        _: "/product",
      }
    },
    auth: {
      login: {
        _: "/user/login",
        confirm: "/user/login/confirm"
      },
      onboard: {
        _: "/user/onboard",
        confirm: "/user/onboard/confirm",
        resendCode: "/user/onboard/code",
      },
      mfa: {
        setup: "/user/mfa/setup",
        confirm: "/user/mfa/setup/confirm",
      },
      password: {
        reset: "/user/password/reset",
        confirm: "/user/password/confirm",
        requireUpdate: "/user/password/update"
      },
    },
    user: {
      settings: {
        view: "/user/settings/view",
        edit: "/user/settings/edit",
      },
      recovery: {
        _: "/user/recovery",
        confirm: "/user/recovery/confirm",
      }
    }
  },
  links: {
    github: "https://github.com/tinstafl",
    x: "https://x.com/_tinstafl",
  },
}
