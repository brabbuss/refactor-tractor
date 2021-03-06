import { expect } from 'chai';
import Sleep from '../src/classes/data-classes/Sleep';
import Activity from '../src/classes/data-classes/Activity';
import Hydration from '../src/classes/data-classes/Hydration';
import User from '../src/classes/User';
import {sleepSampleData, hydrationSampleData, userSampleData, activitySampleData} from "../src/data/test-sample-data"

describe('User', function() {
  let user, user2;
  let friend1
  let friend2
  let friend3
  let friends


  beforeEach(() => {
    friend1 = new User(userSampleData[1], userSampleData, activitySampleData, hydrationSampleData, sleepSampleData, '2019/09/15')
    friend2 = new User(userSampleData[2], userSampleData, activitySampleData, hydrationSampleData, sleepSampleData, '2019/09/15')
    friend3 = new User(userSampleData[3], userSampleData, activitySampleData, hydrationSampleData, sleepSampleData, '2019/09/15')
    friends = [friend1, friend2, friend3];

    user = new User(userSampleData[0], userSampleData, activitySampleData, hydrationSampleData, sleepSampleData, '2019/09/15')
    user.populateUserData(userSampleData, activitySampleData, hydrationSampleData, sleepSampleData, '2019/09/15')
    user2 = new User(userSampleData[1])

    user.updateActivities("2019/09/11", 1111, 3, 1)
    user.updateActivities("2019/09/12", 1178, 3, 12)
    user.updateActivities("2019/09/13", 1178, 3, 13)
    user.updateActivities("2019/09/14", 0, 3, 143)
    user.updateActivities("2019/09/15", 1178, 3, 13)
    user.updateActivities("2019/09/16", 1178, 3, 1)
    user.updateActivities("2019/09/17", 1178, 3, 11)
    user.updateActivities("2019/09/18", 1178, 30, 1)

  })
  it('should be a function', function() {
    expect(User).to.be.a('function');
  });
  it('should be an instance of user', function() {
    expect(user).to.be.an.instanceof(User);
  });
  it('should have an id', function() {
    expect(user.id).to.equal(1);
  });
  it('should have a name', function() {
    expect(user.name).to.equal('Scott Brabson');
  });
  it('should have an address', function() {
    expect(user.address).to.equal('555 Zuni st, Arvada, CO 80003');
  });
  it('should have an email address', function() {
    expect(user.email).to.equal('scotty.crackalackin@yahoo.com');
  });
  it('should have a stride length', function() {
    expect(user.strideLength).to.equal(6.6);
  });
  it('should have a daily step goal', function() {
    expect(user.dailyStepGoal).to.equal(15000);
  });
  it('should have friends', function() {
    // console.log(user);
    expect(user.friends).to.deep.equal([ 29, 13, 9 ]);
    expect(user.friendObjects.length).to.equal(3);
  });
  it('should have an array of Activity class objects', function() {
    expect(user.activityRecord.dataObjectArray[0] instanceof Activity).to.equal(true)
  });
  it('should have an array of Sleep class objects', function() {
    expect(user.sleepRecord.dataObjectArray[0] instanceof Sleep).to.equal(true)
  });
  it('should have an array of Hydration class objects', function() {
    expect(user.ouncesRecord.dataObjectArray[0] instanceof Hydration).to.equal(true)
  });
  it('should have a default ouncesAverage of 0', function() {
    expect(user2.ouncesAverage).to.equal(0);
  });
  it('should have a default ouncesRecord of []', function() {
    expect(user2.ouncesRecord).to.deep.equal([]);
  });
  it('should have a default hoursSleptAverage of 0', function() {
    expect(user2.hoursSleptAverage).to.equal(0);
  });
  it('should have a default sleepQualityAverage of 0', function() {
    expect(user2.sleepQualityAverage).to.equal(0);
  });
  it('should have a default sleepRecord of []', function() {
    expect(user2.sleepRecord).to.deep.equal([]);
  });
  it('should have a default sleepQualityRecord of []', function() {
    expect(user2.sleepQualityRecord).to.deep.equal([]);
  });
  it('should have a default activityRecord of []', function() {
    expect(user2.activityRecord).to.deep.equal([]);
  });
  it('should have a default value of [] for accomplishedDays', function() {
    expect(user2.accomplishedDays).to.deep.equal([]);
  });
  it('should have a default value of [] for trendingStepDays', function() {
    expect(user2.trendingStepDays).to.deep.equal([]);
  });
  it('should have a default value of [] for trendingStairsDays', function() {
    expect(user2.trendingStairsDays).to.deep.equal([]);
  });
  it('getFirstName should return the first name of the user', function () {
    expect(user.getFirstName()).to.equal('SCOTT');
  });
  it('sumDailyOunces should show the last week of water', function() {
    user.updateHydration("2019/06/15", 37)
    user.updateHydration("2021/06/16", 75)
    user.updateHydration("2021/06/16", 85)

    expect(user.sumDailyOunces("2021/06/16")).to.equal(160);
  });
  it('should retrieve averages for sleep quality, hours, ounces, steps', function() {
    user.getUserAverageData()
    expect(user.hoursSleptAverage).to.equal(6.1);
    expect(user.sleepQualityAverage).to.equal(1.5);
    expect(user.ouncesAverage).to.equal(67.3);
    expect(user.totalStepsThisWeek).to.equal(21367);
  });
  it('should add data to respective array and update respective user average', function() {
    user.updateHydration('2020/10/31', 56)
    user.updateActivities('2020/10/31', 32560, 30, 19)
    user.updateSleep('2020/10/31', 8, 5)

    expect(user.ouncesAverage).to.equal(66.4)
    expect(user.sleepQualityAverage).to.equal(1.8)
    expect(user.accomplishedDays.length).to.equal(1)
  });
  it('should have a method that return the highest climbing record', function() {
    expect(user.findClimbingRecord()).to.equal(143)
  });
  it('should have a method that calculates daily calories burned', function() {
    expect(user.calculateDailyCalories("2019/09/18")).to.equal(228)
  });
  it('calculateAverageMinutesActiveThisWeek should calculate the average minutes active', function() {
    expect(user.calculateAverageMinutesActiveThisWeek("2019/09/17")).to.equal(3)
  });
  it('calculateAverageStepsThisWeek should calculate the average steps taken in a given week', function() {
    user.updateActivities("2019/09/11", 1111)
    user.updateActivities("2019/09/12", 1178)
    user.updateActivities("2019/09/13", 1178)
    user.updateActivities("2019/09/14", 0)
    user.updateActivities("2019/09/15", 1178)
    user.updateActivities("2019/09/16", 1178)
    user.updateActivities("2019/09/17", 1178)
    user.updateActivities("2019/09/18", 1178)

    expect(user.calculateAverageStepsThisWeek("2019/09/18")).to.equal(1010)
  });
  it('calculateAverageFlightsThisWeek should calculate the average flights of stairs taken in a given week', function() {
    expect(user.calculateAverageFlightsThisWeek("2019/09/17")).to.equal(28)
  });
  it('findFriendsNames should find the first names of friends', function() {
    user.findFriendsNames(friends);
    expect(user.friendsNames).to.deep.equal([ 'BRUCE', 'ESTELLE', 'BOB' ]);
  });
  it('calculateTotalStepsThisWeek should add users steps for week', function() {
    user.getUserAverageData();
    expect(user.totalStepsThisWeek).to.equal(21367);
  });
  it('findFriendsTotalStepsForWeek should find friends\' total steps', function() {
    user.findFriendsTotalStepsForWeek('2020/06/07');
    expect(user.friendsActivityRecords).to.deep.equal([{"id": 13, "firstName": "BRUCE", "totalWeeklySteps": 47577}, {"id": 29, "firstName": "ESTELLE", "totalWeeklySteps": 47577}, {"id": 9, "firstName": "BOB", "totalWeeklySteps": 47577}]);
  });
  it('updateAccomplishedDays should create an array of good days', function() {
    user.updateActivities("2019/09/16", 11178, 3, 1)
    user.updateActivities("2019/09/17", 11478, 3, 11)
    user.updateActivities("2019/09/18", 33378, 30, 1)
    expect(user.accomplishedDays.length).to.equal(1);
  })
  it('findTrendingStepDays should find 3+ days with positive trend', function() {
    user.updateActivities("2019/09/16", 33, 3, 1)
    user.updateActivities("2019/09/17", 55, 3, 11)
    user.updateActivities("2019/09/18", 88, 30, 1)
    user.updateActivities("2019/09/19", 97, 3, 1)
    user.updateActivities("2019/09/20", 66, 3, 22)
    user.updateActivities("2019/09/21", 44, 30, 23)
    user.updateActivities("2019/09/22", 5, 3, 24)
    user.updateActivities("2019/09/23", 2, 3, 26)
    user.updateActivities("2019/09/24", 1, 30, 1)

    user.findTrendingStepDays()
    expect(user.trendingStepDays).to.deep.equal(["Your most recent positive step streak was 2020/06/09 - 2020/06/03!", "Your most recent positive step streak was 2019/09/13 - 2020/06/02!", "Your most recent positive step streak was 2019/09/23 - 2019/09/18!"]);
  });
  it('findTrendingStairsDays should find 3+ days with positive trend', function() {
    user.updateActivities("2019/09/16", 33, 3, 1)
    user.updateActivities("2019/09/17", 55, 3, 11)
    user.updateActivities("2019/09/18", 88, 30, 1)
    user.updateActivities("2019/09/19", 97, 3, 1)
    user.updateActivities("2019/09/20", 66, 3, 22)
    user.updateActivities("2019/09/21", 44, 30, 23)
    user.updateActivities("2019/09/22", 5, 3, 24)
    user.updateActivities("2019/09/23", 2, 3, 26)
    user.updateActivities("2019/09/24", 1, 30, 1)

    user.findTrendingStairsDays()
    expect(user.trendingStairsDays).to.deep.equal(["Your most recent positive climbing streak was 2020/06/04 - 2020/06/01!", "Your most recent positive climbing streak was 2020/06/03 - 2020/06/06!", "Your most recent positive climbing streak was 2019/09/17 - 2019/09/14!"]);
  });
});
