export const getFormattedPlansData = (isPromo: boolean) => {
  const PlansData = [
    {
      id: "0",
      name: "one",
      code: isPromo ? "promo1" : "plano1",
      value: 50,
      offers: [
        { id: "0", name: "ilimitado" },
        { id: "1", name: "adicionar processos" },
        { id: "2", name: "controle de equipe" },
        { id: "3", name: "controle de clientes" },
        { id: "4", name: "controle de despesas" },
        { id: "5", name: "atualização histórico de processos" },
        { id: "6", name: "controle de honorários" },
        { id: "7", name: "dashboard gerencial" },
        { id: "8", name: "alertas" },
        { id: "9", name: "mapas" },
      ],
    },
    {
      id: "1",
      name: "office",
      code: isPromo ? "promo2" : "plano2",
      value: 100,
      offers: [
        { id: "0", name: "ilimitado" },
        { id: "1", name: "adicionar processos" },
        { id: "2", name: "controle de equipe" },
        { id: "3", name: "controle de clientes" },
        { id: "4", name: "controle de despesas" },
        { id: "5", name: "atualização histórico de processos" },
        { id: "6", name: "controle de honorários" },
        { id: "7", name: "dashboard gerencial" },
        { id: "8", name: "alertas" },
        { id: "9", name: "mapas" },
      ],
    },
    {
      id: "2",
      name: "office one",
      code: isPromo ? "promo3" : "plano3",
      value: 150,
      offers: [
        { id: "0", name: "ilimitado" },
        { id: "1", name: "adicionar processos" },
        { id: "2", name: "controle de equipe" },
        { id: "3", name: "controle de clientes" },
        { id: "4", name: "controle de despesas" },
        { id: "5", name: "atualização histórico de processos" },
        { id: "6", name: "controle de honorários" },
        { id: "7", name: "dashboard gerencial" },
        { id: "8", name: "alertas" },
        { id: "9", name: "mapas" },
      ],
    },
  ];

  return PlansData;
};
