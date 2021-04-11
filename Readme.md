# Trash App

npm install, npm run dev

Is based on Expo

## Todo
- [ ] State should contain: Location, available data, selected trash to show, Notification time
- [ ] Only show Days that are coming and current day
- [ ] Fetch from backend and/or cache
- [ ] Use localstorage
- [ ] Select location and don't show the screen again
- [ ] Location selector in Profile and first page
- [ ] Endpoint: location id, array of selected trash, current date

## Views
- Initial View
  - Only show ones
  - disable button when nothing is selected
  - on ok click save location to localstoage, fetch data with current timestamp and location for all trash variaties (check if this can be done from the overview page)

- Overview
  - before overview shows up load data from localstorage to state and fetch data.
  - show 6 Elements
  - Change texts and highlicht the colors
  - (on click add popup for more info)
  - Show selected location top left

- Settings
  - Multiselect location
  - checkbox for trash types
  - update state and localstorage when navigating back.
  - refetch or update locally (react query?)