import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const DeploymentModule = buildModule('DeploymentModule', (m) => {
  const jewToken = m.contract('JewToken');
  const ICO = m.contract('ICO', [jewToken]);

  const owner = m.getAccount(0);
  const totalSupply = m.staticCall(jewToken, 'totalSupply');
  m.call(jewToken, 'approve', [ICO, totalSupply], {
    from: owner,
  });

  return { jewToken, ICO };
});

export default DeploymentModule;
