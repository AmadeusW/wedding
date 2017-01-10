#WedWeb

## To Do

- **User loads page**
- [x] Make a request for rsvp status
- [x] update the UI
- [x] server: report status of RSVP (read from Azure Table)

- [ ] All actions write to log table 
- [X] and verify credentials (guid)

- **User sends response**
- [X] Make a request with status and user id
- [X] server: update status of RSVP (write to Azure Table)
- [X] Acknowledge

- **sync between Azure Table and Google Sheets**
- [ ] Create sample data
- [ ] Pull from Google sheets
- [ ] Push to Google sheets
- [ ] Handle conflicts 