import React from "react";
import { Card,List, Avatar } from "antd";

const data = [
    {
      title: 'RAINN Hotline',
      desc:"Contact the Rape, Abuse, and Incest National Network (RAINN) hotline at 1-800-656-HOPE. Help is free, confidential, and available 24/7. Get information at RAINNexternal icon.",
    },
    {
      title: 'National Domestic Violence Hotlineexternal ',
      desc : "Call 1-800-799-7233 and TTY 1-800-787-3224",
    },
    {
      title: 'National Teen Dating Abuse Helpline',
      desc: "Love Is Respect, Call 1-866-331-9474 or TTY 1-866-331-8453."
    },
    {
      title: 'Strong Hearts Native Helpline',
      desc: "Call 1−844-762-8483"
    },
  ];

class HelpCentres extends React.Component {
    render() {
        return (
            <Card style={{ marginTop: 50, marginLeft: 5, width:"70%" }}>
                Help Centres
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://cdn2.iconfinder.com/data/icons/refugee-crisis-color/64/volunteer-fund-help-support-assistance-512.png" />}
                                title={<a href="#">{item.title}</a>}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />,
            </Card>
        )
    }
}

export default HelpCentres;