import React, {useState, useEffect} from 'react';
import { Typography,Input,Timeline ,Card} from "antd";
import { useGetSentimentQuery } from '../services/sentimentApi';
import Loader from './Loader';


const timeLineStyle = {
    marginTop: '15px'
}
const Sentiment = () => {
    const { Search } = Input;
    const {Title} = Typography;
    const [stock, setStock] = useState('TSLA'); 
    const { data: sentiment, isFetching } = useGetSentimentQuery(stock);
    const onSearch = (value) => {
        setStock(value);
      }

    if (isFetching) return <Loader />; 


    return(<>
 
        <div>
        <Search
        placeholder="Search Sentiment Score"
        allowClear
        enterButton="Search"
        size="medium"
        onSearch={onSearch}
      />
      <div id="inner">
         <Title>Stock: {stock}</Title>
      
       
         {
          
         sentiment?.map((s) => 
         <Timeline color="red">
          <Timeline.Item>
              <p>
Date: {s.date}
</p>
<p>
Sentiment Score: {s.score}
</p>
<p>
Positive Score: {s.positive_score}
</p>
<p>
Negative Score: {s.negative_score}
</p>
<p>
Activity: {s.activity}
</p>
          </Timeline.Item>
          </Timeline>
        )}

</div>
</div> 

    </>
    )
};

export default Sentiment; 