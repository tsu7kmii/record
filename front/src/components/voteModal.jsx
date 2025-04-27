import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Modal, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { getAnswerList } from '../api/voteApi';
import { handleApiError } from '../api/errorHandler';
import { UserContext } from "./userProvider";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none', 
  borderRadius: '16px', 
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  p: 4,
};

export default function VoteModal({question}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [answerList, setAnswerList] = useState([]);
  const [radioValue, setRadioValue] = useState("");
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleEditSubmit = async (question, answerList) => {
    
    navigate('/vote/edit',{state: {question:question, answerList:answerList}});
  };

  const radioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleVoteSubmit = async () => {
    setError(null);

    
    try {
      const response = await setAnswerCount({voteAnswerId:radioValue});
      if (response.status === 200) {
          // setAnswerList(response.data);
      } else {
          setError(`投票に失敗しました: ${response.data.message}`);
      }
    } catch (error) {
        setError(handleApiError(error));
    }
  };



  const fetchAnswerList = async () => {
    setError(null);

    const questionId = question.voteQuestionId;
    const userId = userData.userId;
    
    try {
      const response = await getAnswerList({voteQuestionId:questionId,userId:userId});
      if (response.status === 200) {
          setAnswerList(response.data);
      } else {
          setError(`回答の取得に失敗しました: ${response.data.message}`);
      }
    } catch (error) {
        setError(handleApiError(error));
    }
  };


  useEffect(() => {
    if(open){
      fetchAnswerList();
    }
  }, [open]);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>View</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Box display="flex" justifyContent="space-between" alignItems="center">
                          
            <Typography variant="h4" component="h2" gutterBottom>
              {question.title}
            </Typography>

            <Button variant="outlined" type="submit" size="large"  onClick={() => handleEditSubmit(question, answerList)}>
                編集
            </Button>
          </Box>

          <FormControl component="fieldset">
            <FormLabel component="legend">回答を選択</FormLabel>
            <RadioGroup aria-label="answer" name="answer" value={radioValue} onChange={radioChange}>
              {answerList.map((answer) =>
                <FormControlLabel key={answer.voteAnswerId} value={answer.voteAnswerId} control={<Radio />} label={answer.answer} />
              )}
            </RadioGroup>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="outlined" type="submit" size="large" onClick={handleVoteSubmit}>
                投票
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}