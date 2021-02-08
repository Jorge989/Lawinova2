export const getFormattedDetailedPlans = (isPromo: boolean) => {
  const DetailedPlans = [
    {
      id: "0",
      name: "one",
      code: "plano1",
      value: 50,
      offers: [
        { id: "0", name: "1 advogados" },
        { id: "1", name: `${isPromo ? 75 : 50} processos` },
      ],
    },
    {
      id: "1",
      name: "office",
      code: "plano2",
      value: 100,
      offers: [
        { id: "0", name: "3 advogados" },
        { id: "1", name: `${isPromo ? 100 : 75} processos` },
      ],
    },
    {
      id: "2",
      name: "office one",
      code: "plano3",
      value: 150,
      offers: [
        { id: "0", name: "6 advogados" },
        { id: "1", name: `${isPromo ? 150 : 100} processos` },
      ],
    },
  ];
  return DetailedPlans;
};