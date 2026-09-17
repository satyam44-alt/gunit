package za.co.santam.cc.claim.lossdetail

uses gw.api.databuilder.ClaimBuilder
uses gw.api.databuilder.PolicyBuilder
uses gw.suites.CCExampleServerSuite
uses gw.testharness.v3.Suites
uses za.co.santam.cc.common.SantamServerTestClassBase

@Suites(CCExampleServerSuite.NAME)
class ACLossDetailPresentationModelTest extends SantamServerTestClassBase {

 var _claim : Claim
 var _presentationModel : ACLossDetailPresentationModel

 private function setup(lossCause : LossCause, policyType : PolicyType) {
   _claim = new ClaimBuilder()
       .withLossCause(lossCause)
       .withLossType(lossCause.Categories.whereTypeIs(LossType).single())
       .withPolicy(new PolicyBuilder()
           .withPolicyType(policyType)
       )
       .create()
   _presentationModel = new ACLossDetailPresentationModel(_claim)
 }

 private function setup(lossCause : LossCause, offering : Offering_Ext) {
   _claim = new ClaimBuilder()
       .withLossCause(lossCause)
       .withLossType(lossCause.Categories.whereTypeIs(LossType).single())
       .withPolicy(new PolicyBuilder()
           .withOffering_Ext(offering)
           .withPolicyType(offering.Categories.whereTypeIs(PolicyType).single())
       )
       .create()
   _presentationModel = new ACLossDetailPresentationModel(_claim)
 }

 function testInTransitLossCauseDamagePercentageAmountVisibilityBasedOnOffering() {
   setup(LossCause.TC_ACINTRANSIT, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()
 }

 function testInTransitLossCauseDamagePercentageAmountVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACINTRANSIT, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testFireLossCauseDamagePercentageAmountVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACFIRE, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testFireLossCauseDamagePercentageAmountVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACFIRE, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testFirePostHarvestLossCauseDamagePercentageAmountVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACFIREPOSTHARVEST, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testFirePostLossCauseDamagePercentageAmountVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACFIREPOSTHARVEST, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testHailLossCauseEstimatedDamageAmountAndEstimatedDamagePercentageVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACHAIL, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testHailLossCauseEstimatedDamageAmountAndEstimatedDamagePercentageVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACHAIL, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testFrostLossCauseEstimatedDamageAmountAndEstimatedDamagePercentageVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACFROST, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testFrostLossCauseEstimatedDamageAmountAndEstimatedDamagePercentageVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACFROST, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testWindLossCauseDamagePercentageAmountVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACWIND, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isFalse()

 }

 function testWindLossCauseDamagePercentageAmountVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACWIND, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testLocustDamageLossCauseDamagePercentageAmountVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACLOCUSTDAMAGE, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isFalse()

 }

 function testLocustDamageLossCauseDamagePercentageAmountVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACLOCUSTDAMAGE, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testInfrastructureLossCauseDamagePercentageAmountVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACINFRASTRUCTURE, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testInfrastructureLossCauseDamagePercentageAmountVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACINFRASTRUCTURE, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testReEstablishmentCostLossCauseDamagePercentageAmountVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACREESTABLISHMENTCOST, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testReEstablishmentCostLossCauseDamagePercentageAmountVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACREESTABLISHMENTCOST, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testExcessiveRainLossCauseDamagePercentageAmountVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACEXCESSIVERAIN, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testExcessiveRainLossCauseDamagePercentageAmountVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACEXCESSIVERAIN, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testExtendedPerilsLossCauseDamagePercentageAmountVisibilityBasedOnOffering() {

   setup(LossCause.TC_ACEXTENDEDPERIL, Offering_Ext.TC_ACNAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testExtendedPerilsLossCauseDamagePercentageAmountVisibilityBasedOnAggregateOffering() {

   setup(LossCause.TC_ACEXTENDEDPERIL, Offering_Ext.TC_ACAGGEXCESSNAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testFireLossCauseDamagePercentageAmountVisibilityBasedOnPolicy() {

   setup(LossCause.TC_ACFIRE, PolicyType.TC_ROANAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testFrostLossCauseEstimatedDamageAmountAndEstimatedDamagePercentageVisibilityBasedOnPolicy() {

   setup(LossCause.TC_ACFROST, PolicyType.TC_ROANAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testInTransitLossCauseDamagePercentageAmountVisibilityBasedOnPolicy() {

   setup(LossCause.TC_ACINTRANSIT, PolicyType.TC_ROASTANDALONE)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isFalse()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testHailLossCauseEstimatedDamageAmountAndEstimatedDamagePercentageVisibilityBasedOnPolicy() {

   setup(LossCause.TC_ACHAIL, PolicyType.TC_NAMEDPERILSSUMMER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isTrue()

 }

 function testLocustDamageLossCauseDamagePercentageAmountVisibilityBasedOnPolicy() {

   setup(LossCause.TC_ACLOCUSTDAMAGE, PolicyType.TC_NAMEDPERILSWINTER)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isFalse()

 }

 function testExcessiveRainLossCauseDamagePercentageAmountVisibilityBasedOnPolicy() {

   setup(LossCause.TC_ACWIND, PolicyType.TC_MPCI)

   assertThat(_presentationModel.EstimatedDamagePercentageVisible).isTrue()
   assertThat(_presentationModel.EstimatedDamageAmountVisible).isFalse()

 }
}
