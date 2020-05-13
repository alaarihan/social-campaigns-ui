export default function() {
  return {
    logs: {
      columns: [
        {
          name: "id",
          required: true,
          label: "#",
          field: "id",
          align: 'left',
          sortable: true
        },
        {
          name: "message",
          label: "Message",
          field: "message",
          align: 'left',
          sortable: true
        },
        {
          name: "type",
          label: "Type",
          field: "type",
          align: 'left',
          type: "badge",
          settings: {color: 'green'},
          sortable: true
        },
        {
          name: "account",
          label: "Account",
          field: "account",
          align: 'left',
          sortable: false
        },
        {
          name: "created",
          label: "Created",
          field: "created_at",
          align: 'left',
          type: "timeago",
          sortable: true
        }
      ]
    }
  };
}
