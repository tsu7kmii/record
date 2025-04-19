export const handleApiError = (error) => {
    if (error.response) {
      return `エラーが発生しました: ${error.response.data.message}`;
    } else {
      return `エラーが発生しました: ${error.message}`;
    }
  };
