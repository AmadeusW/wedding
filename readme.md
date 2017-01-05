#WedWeb

## To Do

- **User loads page**
- [ ] Make a request for rsvp status
- [ ] update the UI
- [ ] server: report status of RSVP (read from Azure Table)

- [ ] All actions write to log table 
- [ ] and verify credentials (guid)

- **User sends response**
- [ ] Make a request with status and user id
- [ ] server: update status of RSVP (write to Azure Table)
- [ ] Acknowledge

- **sync between Azure Table and Google Sheets**
- [ ] Create sample data
- [ ] Pull from Google sheets
- [ ] Push to Google sheets
- [ ] Handle conflicts 