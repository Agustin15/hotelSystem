export const chartCategoryStateRooms = (categoryData, elementChart) => {
  var chart = new CanvasJS.Chart(elementChart, {
    animationEnabled: true,
    legend: {
      fontSize: 12
    },
    data: [
      {
        type: "doughnut",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabel: "{y}",
        yValueFormatString: '#,##0.0"%"',
        indexLabelFontSize: 15,
        indexLabelFontColor: "black",
        dataPoints: dataPoints(categoryData)
      }
    ]
  });
  chart.render();
};

const dataPoints = (categoryData) => {
  let percentajeBusy =
    (categoryData.totalRoomCategoryBusy * 100) / categoryData.totalRoomCategory;

  let percentajeAvailable =
    (categoryData.totalRoomCategoryFree * 100) / categoryData.totalRoomCategory;

  return [
    {
      label: "Disponibles",
      y: percentajeAvailable,
      color: "rgb(28, 194, 28)"
    },
    {
      label: "Ocupadas",
      y: percentajeBusy,
      color: "rgb(236, 5, 5)"
    }
  ];
};
