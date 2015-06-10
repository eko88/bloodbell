bloodBell.controller('bloodCtrl', function ($scope, $http, $log, $firebaseArray, $timeout)
{

    $http.get('data/locations.json').success(function(locData) 
    {
        $scope.locations =  locData;
        $scope.locations2 = locData;
    });

    $http.get('data/chalice.json').success(function(chaliceData) 
    {
        $scope.chalices =  chaliceData;
    });

    // Initialize firebase reference
    var ref = new Firebase("https://reference");

    // create a synchronized firebase array
    $scope.posts = $firebaseArray(ref);

    // Add post to firebase
    $scope.addPost = function() 
    {
        var time = Firebase.ServerValue.TIMESTAMP;

        var levelRangeMin = ( ($scope.fields.level - 20) - ($scope.fields.level * 0.20 ) ).toFixed();
        var levelRangeMax = ( ($scope.fields.level + 20) + ($scope.fields.level * 0.20 ) ).toFixed();

        if(levelRangeMin < 0)
        {
            levelRangeMin = 0;
        }

        $scope.posts.$add(
        {
            location: $scope.fields.location,
            type: $scope.fields.type,
            name: $scope.fields.name,
            level: $scope.fields.level,
            levelrange: levelRangeMin + "-" + levelRangeMax,
            note: $scope.fields.note,
            time: time
        });

        $scope.postForm.$setPristine();
        $scope.fields={};
    };

    $(document).ready(function() {

        $("#type").change(function() {
            var val = $(this).val();
            if (val == "Chalice Dungeon") 
            {
                $scope.locations = $scope.chalices;
            } 
            else 
            {
                $scope.locations = $scope.locations2;
            } 
        });
    });
});