import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  bubble: {
    maxWidth: '80%',
    minWidth: '20%',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 20,
    backgroundColor: 'red',
    borderRadius: 16,
  },
  client: {
    alignSelf: 'flex-end',
  },
  server: {
    alignSelf: 'baseline',
  },
  system: {
    alignSelf: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    bottom: 4,
  },
  timeText: {
    color: 'gray',
    fontSize: 10,
    marginEnd: 4,
  },
});
