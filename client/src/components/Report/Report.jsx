import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { ReportData } from "../../assets/data/ReportData";
import './Report.css'

const Container = styled.div`
  padding: 20px;
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
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #000;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const data = [
  {
    result: "Abnormal",
    resultColor: "#FF6347",
    stages: [
      { color: "#FF6347", value: "Stage 1" },
      { color: "#FFA07A", value: "Stage 1.5" },
    ],
    normalRange: "7-8",
  },
  {
    result: "Borderline",
    resultColor: "#FFA500",
    stages: [
      { color: "#FFA500", value: "Stage 2" },
      { color: "#FFD700", value: "Stage 2.5" },
    ],
    normalRange: "7-8",
  },
  {
    result: "Borderline High",
    resultColor: "#FFFF00",
    stages: [
      { color: "#FFFF00", value: "Stage 3" },
      { color: "#FFD700", value: "Stage 3.5" },
    ],
    normalRange: "7-8",
  },
  {
    result: "High",
    resultColor: "#9ACD32",
    stages: [
      { color: "#9ACD32", value: "Stage 4" },
      { color: "#32CD32", value: "Stage 4.5" },
    ],
    normalRange: "7-8",
  },
];

const TableRow = ({ row }) => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 60 },
  });

  return (
    <animated.tr style={animationProps}>
      <Td> <a href={row.url}>{row.reagent}</a></Td>
      <Td>
        <ColorBox style={{ backgroundColor: row.resultColor }} />
        {/* {row.result} */}
        result
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
            <ColorBox style={{ backgroundColor: stage.color }} className="clBox"/>
            {stage.label}
          </div>
        ))}
      </Td>
      <Td>{row.normalRange}</Td>
    </animated.tr>
  );
};

const Report = () => (
  <Container className="cnt-report">
    <Heading>Urine Test Results</Heading>
    <Table>
      <thead>
        <tr>
          <Th>Chemical Pads or Reagents </Th>
          <Th>Result</Th>
          <Th style={{
              width: "44%",
            }}>Different Stages</Th>
          <Th>Normal</Th>
        </tr>
      </thead>
      <tbody>
        {ReportData.map((row, index) => (
          <TableRow key={index} row={row} />
        ))}
      </tbody>
    </Table>
  </Container>
);

export default Report;
