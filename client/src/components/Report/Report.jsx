import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { ReportData } from "../../assets/data/ReportData";
import "./Report.css";

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  background-color: #f4f4f4;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
`;

const ColorBox = styled.div`
  display: inline-block;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #000;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const TableRow = ({ row,result }) => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 60 },
  });

  return (
    <animated.tr style={animationProps}>
      <Td>
        {" "}
        <a href={row.url}>{row.reagent}</a>
      </Td>
      <Td>
        <ColorBox style={{ backgroundColor: result.color, width: "20px" }} />
        <br/>
        {result.value}
      </Td>
      <Td className="stages">
        {row.stages.map((stage, index) => (
          <div
            key={index}
            style={{
              display: "flex",
            }}
            className="stage"
          >
            <ColorBox
              style={{ backgroundColor: stage.color }}
              className="clBox"
            />
            {stage.label}
          </div>
        ))}
      </Td>
      <Td>{row.normalRange}</Td>
    </animated.tr>
  );
};

const Report = (responseResult) => {
    console.log("kjk",responseResult,responseResult.responseResult[0])
  return (
    <Container className="cnt-report">
      <Heading>Urine Test Results</Heading>
      <Table>
        <thead>
          <tr>
            <Th>Chemical Pads or Reagents</Th>
            <Th>Result</Th>
            <Th
              style={{
                width: "44%",
              }}
            >
              Different Stages
            </Th>
            <Th>Normal</Th>
          </tr>
        </thead>
        <tbody>
          {ReportData.map((row, index) => (
            <TableRow key={index} row={row} result={responseResult.responseResult[row.id-1]}/>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Report;
