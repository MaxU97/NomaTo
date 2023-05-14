import React from "react";
import { useTranslation } from "react-i18next";
import {
  banUser,
  removeWarnings,
  toggleAdmin,
  warnUser,
  warnuser,
} from "../../api/admin";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import { usePromptHandler } from "../../components/Prompt/Prompt.component";

const ActionBar = ({ details }) => {
  const { notification } = useNotificationHandler();
  const { prompt } = usePromptHandler();
  const { t } = useTranslation();
  const user_name = details ? details.name + " " + details.surname : "";
  const ban = async (e) => {
    try {
      const response = await banUser({ id: details.id, reason: e ? e : "" });
      notification([response]);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      notification([e], true);
    }
  };

  const warn = async (e) => {
    try {
      const response = await warnUser({ id: details.id, reason: e });
      notification([response]);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      notification([e], true);
    }
  };

  const removeWarn = async (e) => {
    try {
      const response = await removeWarnings({ id: details.id, count: e });
      notification([response]);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      notification([e], true);
    }
  };

  const makeAdmin = async () => {
    try {
      const response = await toggleAdmin({ id: details.id });
      notification([response]);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      notification([e], true);
    }
  };

  return (
    <div className="user-overview-actions">
      <div
        className="user-overview-actions-button"
        onClick={() => {
          prompt(
            !details.suspended
              ? t("user-details.sure-ban", {
                  user_name,
                })
              : t("user-details.sure-pardon", {
                  user_name,
                }),
            !details.suspended ? t("user-details.provide-reason") : "",
            !details.suspended,
            async (e) => {
              await ban(e);
            }
          );
        }}
      >
        {details && details.suspended
          ? t("user-details.pardon")
          : t("user-details.ban")}
      </div>

      <div
        className="user-overview-actions-button"
        onClick={() => {
          prompt(
            t("user-details.sure-warn", {
              user_name,
            }),
            t("user-details.warn-desc", {
              warnings: details.warnings ? details.warnings : 0,
            }),
            true,
            async (e) => {
              await warn(e);
            }
          );
        }}
      >
        {t("user-details.warn")}
      </div>
      {details && details.warnings > 0 && (
        <div
          className="user-overview-actions-button"
          onClick={() => {
            prompt(
              t("user-details.remove-warnings-for", {
                user_name,
              }),
              t("user-details.number-of-warnings", {
                warnings: details.warnings ? details.warnings : 0,
              }),
              true,
              async (e) => {
                await removeWarn(e);
              },
              "number"
            );
          }}
        >
          {t("user-details.remove-warnings")}
        </div>
      )}
      <div
        className="user-overview-actions-button"
        onClick={() => {
          prompt(
            details && details.admin
              ? t("user-details.demote-admin", {
                  user_name,
                })
              : t("user-details.make-admin", {
                  user_name,
                }),
            "",
            false,
            async (e) => {
              await makeAdmin(e);
            },
            "number"
          );
        }}
      >
        {details && details.admin
          ? t("user-details.remove-admin")
          : t("user-details.promote-admin")}
      </div>
    </div>
  );
};

export default ActionBar;
