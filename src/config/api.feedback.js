import axios from './axios-customize';

export const callCreateFeedback = (userId, numberStar, dateStay, roomType, content) => {
  return axios.post('/feedbacks', null, {
    params: {
      userId,
      numberStar,
      dateStay,
      roomType,
      content
    }
  });
};

export const callGetFeedbacks = (page = 1, size = 10, roomType = null, fromDate = null, toDate = null) => {
  return axios.get('/feedbacks', {
    params: {
      page,
      size,
      roomType,
      fromDate,
      toDate
    }
  });
}; 