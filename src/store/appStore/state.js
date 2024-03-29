import gql from "graphql-tag";

const page = {
  title: "Social Campaigns",
  name: "",
  settings: {
    popupEditing: false,
    filters: false,
    topActions: false,
    rowActions: true,
    backToUrl: null
  }
};

export default function() {
  return {
    activePageName: null,
    page: { ...page },
    logs: {
      page: {
        title: "Logs",
        name: "logs",
        settings: { ...page.settings }
      },
      type: {
        name: "log",
        title: "Log"
      },
      queries: {
        create: gql`
          mutation insert_log_one($object: log_insert_input!) {
            insert_log_one(object: $object) {
              id
              message
              type
              host_name
            }
          }
        `
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "#",
          field: "id",
          align: "left",
          filter: [
            {
              id: "id_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "id_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "message",
          label: "Message",
          field: "message",
          align: "left",
          sortable: true,
          filter: { op: "_ilike" },
          editor: {
            type: "textarea"
          }
        },
        {
          name: "type",
          label: "Type",
          field: "type",
          align: "left",
          type: "badge",
          settings: {
            color: [
              {
                value: "_default",
                color: "green"
              },
              {
                value: "ERROR",
                color: "red"
              }
            ]
          },
          filter: {
            type: "select",
            options: [{ label: "All", value: null }, "INFO", "ERROR"]
          },
          editor: {
            type: "select",
            options: ["INFO", "ERROR"]
          },
          sortable: true
        },
        {
          name: "account",
          label: "Account",
          field: "account",
          align: "left",
          notEditable: true,
          editor: false,
          sortable: false
        },
        {
          name: "host_name",
          label: "Host",
          field: "host_name",
          align: "left",
          type: "text",
          filter: { op: "_eq" },
          sortable: true
        },
        {
          name: "created",
          label: "Created",
          field: "created_at",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "actions",
          label: "#",
          field: "id",
          align: "left",
          type: "actions",
          actions: ["edit", "delete"],
          sortable: true
        }
      ]
    },
    accounts: {
      page: {
        title: "Accounts",
        name: "accounts",
        settings: { ...page.settings }
      },
      type: {
        name: "account",
        title: "Account"
      },
      queries: {
        create: gql`
          mutation insert_account_one($object: account_insert_input!) {
            insert_account_one(object: $object) {
              id
              campaign_id
              username
              password
              email
              status
              status_duration
              credit
              last_activity
              notes
              created_at
              updated_at
            }
          }
        `
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "#",
          field: "id",
          align: "left",
          filter: [
            {
              id: "id_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "id_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "username",
          label: "User Name",
          field: "username",
          align: "left",
          sortable: true,
          filter: { op: "_ilike" }
        },
        {
          name: "password",
          label: "Password",
          field: "password",
          align: "left",
          sortable: true,
          filter: { op: "_ilike" }
        },
        {
          name: "email",
          label: "Email",
          field: "email",
          align: "left",
          sortable: true,
          filter: { op: "_ilike" }
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          align: "left",
          type: "badge",
          settings: {
            color: [
              {
                value: "_default",
                color: "grey"
              },
              {
                value: "ONLINE",
                color: "green"
              },
              {
                value: "BLOCKED",
                color: "red"
              },
              {
                value: "SUSPENDED",
                color: "red"
              },
              {
                value: "YV_SUSPENDED",
                color: "deep-orange"
              },
              {
                value: "LOGIN_FAILED",
                color: "deep-orange"
              }
            ]
          },
          filter: {
            type: "select",
            options: [
              { label: "All", value: null },
              "OFFLINE",
              "ONLINE",
              "DONE",
              "BLOCKED",
              "SUSPENDED",
              "YV_SUSPENDED",
              "LOGIN_FAILED"
            ]
          },
          editor: {
            type: "select",
            options: [
              "OFFLINE",
              "ONLINE",
              "DONE",
              "BLOCKED",
              "SUSPENDED",
              "YV_SUSPENDED",
              "LOGIN_FAILED"
            ]
          },
          sortable: true
        },
        {
          name: "status_duration",
          required: false,
          label: "Status Duration",
          field: "status_duration",
          align: "left",
          filter: [
            {
              id: "status_duration_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "status_duration_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "credit",
          required: false,
          label: "Credit",
          field: "credit",
          align: "left",
          filter: [
            {
              id: "credit_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "credit_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "last_activity",
          label: "Last Activity",
          field: "last_activity",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "notes",
          label: "Notes",
          field: "notes",
          align: "left",
          sortable: true,
          filter: { op: "_ilike" },
          editor: {
            type: "textarea"
          }
        },
        {
          name: "campaign_id",
          label: "Campaign ID",
          field: "campaign_id",
          align: "left",
          sortable: true,
          filter: {
            type: "number",
            op: "_eq"
          },
          editor: {
            type: "number"
          }
        },
        {
          name: "created_at",
          label: "Created",
          field: "created_at",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "updated_at",
          label: "Updated",
          field: "updated_at",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "actions",
          label: "#",
          field: "id",
          align: "left",
          type: "actions",
          actions: ["edit", "delete"],
          sortable: true
        }
      ]
    },
    campaigns: {
      page: {
        title: "Campaigns",
        name: "campaigns",
        settings: { ...page.settings }
      },
      type: {
        name: "campaign",
        title: "Campaign"
      },
      queries: {
        create: gql`
          mutation insert_campaign_one($object: campaign_insert_input!) {
            insert_campaign_one(object: $object) {
              id
              name
              type
              limited
              accounts_number
              target
              status
              progress
              link
              cost_per_one
              repeat
              repeated
              overwrite
              created_at
              updated_at
            }
          }
        `
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "#",
          field: "id",
          align: "left",
          filter: [
            {
              id: "id_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "id_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
          sortable: true,
          filter: { op: "_ilike" }
        },
        {
          name: "type",
          label: "Type",
          field: "type",
          align: "left",
          type: "badge",
          settings: { color: "grey" },
          filter: {
            type: "select",
            options: [
              { label: "All", value: null },
              "YOUTUBE_VIEWS",
              "YOUTUBE_LIKES",
              "YOUTUBE_COMMENTS",
              "YOUTUBE_SUBSCRIBES"
            ]
          },
          editor: {
            type: "select",
            options: [
              "YOUTUBE_VIEWS",
              "YOUTUBE_LIKES",
              "YOUTUBE_COMMENTS",
              "YOUTUBE_SUBSCRIBES"
            ]
          },
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          align: "left",
          type: "badge",
          settings: {
            color: [
              {
                value: "_default",
                color: "grey"
              },
              {
                value: "ACTIVE",
                color: "green"
              },
              {
                value: "COMPLETED",
                color: "blue"
              },
              {
                value: "PENDING",
                color: "yellow"
              }
            ]
          },
          filter: {
            type: "select",
            options: [
              { label: "All", value: null },
              "ACTIVE",
              "PENDING",
              "COMPLETED",
              "RESTART",
              "CANCEL",
              "CANCELED"
            ]
          },
          editor: {
            type: "select",
            options: [
              "ACTIVE",
              "PENDING",
              "COMPLETED",
              "RESTART",
              "CANCEL",
              "CANCELED"
            ]
          },
          sortable: true
        },
        {
          name: "limited",
          label: "Limited",
          field: "limited",
          align: "left",
          sortable: true,
          format: val => (val ? "Yes" : "No"),
          filter: {
            type: "select",
            options: [
              { label: "All", value: null },
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]
          },
          editor: {
            type: "select",
            options: [
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]
          }
        },
        {
          name: "accounts_number",
          label: "Accounts #",
          field: "accounts_number",
          align: "left",
          sortable: true,
          filter: {
            type: "number",
            op: "_eq"
          },
          editor: {
            type: "number"
          }
        },
        {
          name: "target",
          required: false,
          label: "Target",
          field: "target",
          align: "left",
          filter: [
            {
              id: "target_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "target_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "progress",
          required: false,
          label: "Progress",
          field: "progress",
          align: "left",
          filter: [
            {
              id: "progress_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "progress_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "repeat",
          required: false,
          label: "Repeat",
          field: "repeat",
          align: "left",
          filter: [
            {
              id: "repeat_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "repeat_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "repeated",
          required: false,
          label: "Repeated",
          field: "repeated",
          align: "left",
          filter: [
            {
              id: "repeated_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "repeated_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "cost_per_one",
          required: false,
          label: "Cost per One",
          field: "cost_per_one",
          align: "left",
          filter: [
            {
              id: "cost_per_one_gte",
              label: ">=",
              type: "number",
              op: "_gte"
            },
            {
              id: "cost_per_one_lte",
              label: "<=",
              type: "number",
              op: "_lte"
            }
          ],
          editor: {
            type: "number"
          },
          sortable: true
        },
        {
          name: "link",
          label: "Link",
          field: "link",
          align: "left",
          sortable: true,
          filter: { op: "_eq" }
        },
        {
          name: "overwrite",
          label: "Overwrite",
          field: "overwrite",
          align: "left",
          type: "badge",
          settings: { color: "grey" },
          filter: {
            type: "select",
            options: [{ label: "All", value: null }, "yes", "no"]
          },
          editor: {
            type: "select",
            options: ["yes", "no"]
          },
          sortable: true
        },
        {
          name: "created_at",
          label: "Created",
          field: "created_at",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "updated_at",
          label: "Updated",
          field: "updated_at",
          align: "left",
          type: "timeago",
          settings: { autoUpdate: false },
          sortable: true
        },
        {
          name: "actions",
          label: "#",
          field: "id",
          align: "left",
          type: "actions",
          actions: ["edit"],
          sortable: true
        }
      ]
    }
  };
}
